export default {
  Thread: {
    authorInfo: async (thread, args, { models, user }) => {
      const author = await thread.getAuthor()
      return {
        authorizationInfo: {
          canView: true, //TODO: later with protected notes, this may be false
          canEdit: user ? user.id === author.id : false
        },
        author
      }
    }
  },
  Query: {
    thread: async (parent, { id }, { models, user }) => {
      try {
        return models.Thread.findOne({ where: { id }})
      } catch (e) {
        throw e
      }
    },
    threads: async (parent, { cursor, limit }, { models }) => {
      try {
        const options = {
          where: {},
          limit,
          order: [['updatedAt', 'DESC']]
        }
        if (cursor) {
          options.where.createdAt = {
            $lt: cursor
          }
        }
        const threads = await models.Thread.findAll(options)
        return {
          pageInfo: {
            hasNextPage: true,
            hasPreviousPage: !!cursor
          },
          edges: threads.map(thread => {
            return {
              cursor: thread.updatedAt,
              node: thread
            }
          })
        }
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    userThreads: async (parent, { userId, cursor, limit }, { models, user }) => {
      try {
        const options = {
          where: { userId },
          limit,
          order: [['updatedAt', 'DESC']]
        }
        if (cursor) {
          options.where.createdAt = {
            $lt: cursor
          }
        }
        const threads = await models.Thread.findAll(options)
        return {
          pageInfo: {
            hasNextPage: true,
            hasPreviousPage: !!cursor
          },
          edges: threads.map(thread => {
            return {
              cursor: thread.updatedAt,
              node: thread
            }
          })
        }
      } catch (e) {
        console.log(e)
        throw e
      }
    }
  },
  Mutation: {
    createThread: async (parent, args, { models, user }) => {
      try {
        console.log(user.id)
        if (!user) throw new Error(`Anauthorized`)
        return await models.Thread.create({ userId: user.id })
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    updateThread: async (parent, { id, detail }, { models, user }) => {
      try {
        if (!user) throw new Error(`Anauthorized`)
        const thread = await models.Thread.findOne({ where: { id } })
        if (!thread) throw new Error(`Not found thread with ${id}`)
        if (user.id !== thread.userId) throw new Error(`Anauthorized`)
        return await thread.update({ detail })
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    deleteThread: async (parent, { id }, { models, user }) => {
      try {
        if (!user) throw new Error(`Anauthorized`)
        await models.Thread.destroy( { where: { id } })
        return true
      } catch (e) {
        console.log(e)
        return false
      }
    },
    createTodoItemThread: async (root, { todoItemId }, { models, user }) => {
      try {
        if (!user) throw new Error(`Anauthenticated`)
        const todoItem = await models.TodoItem.findOne({ where: { id: todoItemId } })
        if (!todoItem || user.id !== todoItem.userId) throw new Error(`Unauthorized`)
        if (await todoItem.getThread()) throw new Error(`Already had thread associated`)
        const thread = await models.Thread.create({ userId: user.id })
        await todoItem.update({ threadId: thread.id })
        return thread
      } catch (e) {
        console.log(e)
        throw e
      }
    }
  }
}
