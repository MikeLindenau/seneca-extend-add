function extendAdd(seneca, wrappers) {
  if (!wrappers) throw Error('wrappers need to be added if extending add')

  wrappers = wrappers.slice()
  wrappers.reverse()

  // Main wrapping function
  return function(pattern, action) {
    seneca.add(pattern, function(args, reply) {
      const seneca = this
      action = action.bind(seneca)

      let dispatch = function(args) {
        action(args, reply)
      }

      wrappers.forEach(function(wrapper) {
        dispatch = wrapper(pattern)(reply)(dispatch)
      })

      dispatch(args)
    })
  }
}

module.exports = extendAdd
