import React from 'react'
import { vote } from './../reducers/anecdoteReducer'
import { notify } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from './../services/anecdotes'

const AnecdoteList = props => {
  const voteHandler = (anecdote) => async () => {
    anecdote = await anecdoteService.update(anecdote)
    props.vote(anecdote.id)
    props.notify(`you voted '${anecdote.content}'`)
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={voteHandler(anecdote)}>
              vote
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const anecdotesToShow = (anecdotes, filter) => {
  return filter.length === 0 ? anecdotes :
    anecdotes
      .filter(anecdote =>
        anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) > -1
      )
      .sort((a, b) => a.votes < b.votes ? 1 : a.votes > b.votes ? -1 : 0)
}
const mapStateToProps = (state) => { return {
  anecdotes: anecdotesToShow(state.anecdote, state.filter)
}}
const mapDispatchToProps = {
  vote, notify
}
const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)

export default ConnectedAnecdoteList