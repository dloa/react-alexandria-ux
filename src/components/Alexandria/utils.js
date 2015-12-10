import alt from './alt';

export default {
    generateSourceActions: (name, otherActions = []) => {
        let actions = [name + 'Loading', name + 'Success', name + 'Failed'].concat(otherActions)
        return alt.generateActions.apply(alt, actions)
    },
    simpleCachingSource: (name, Actions, remote, extraProps = null) => {
        let source = {}
        let n = 'fetch' + name

        source[n] = {
            local(state, id) {
                return state.results ? (state.results[id] ? state.results : null) : null;
            },

            loading: Actions[name + 'Loading'],
            success: Actions[name + 'Success'],
            error:   Actions[name + 'Failed'],

            shouldFetch(state) {
                return true
            }
        }

        source[n].remote = remote
        extraProps && Object.keys(extraProps).map(p => {
            source[n][p] = extraProps[p];
        })

        return source;
    }
}

