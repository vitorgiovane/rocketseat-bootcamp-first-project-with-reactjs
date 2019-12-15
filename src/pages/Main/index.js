import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, InputRepository, List, SubmitButton } from './styles'
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'
import Container from '../../components/container'

import api from '../../services/api'

class Main extends Component {
  state = {
    newRepository: '',
    repositories: [],
    loading: false,
    notFound: false
  }

  componentDidMount() {
    const repositories = JSON.parse(localStorage.getItem('repositories'))

    if (repositories) {
      this.setState({
        repositories
      })
    }
  }

  componentDidUpdate(previousProps, previousState) {
    const { repositories: previousRepositores } = previousState
    const { repositories } = this.state
    if (repositories !== previousRepositores) {
      localStorage.setItem(
        'repositories',
        JSON.stringify(this.state.repositories)
      )
    }
  }

  handleInputChange = e => {
    this.setState({
      newRepository: e.target.value
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ loading: true })
    const { newRepository, repositories } = this.state

    let response = null
    try {
      response = await api.get(`/repos/${newRepository}`)
    } catch (exception) {
      this.setState({
        notFound: true,
        loading: false
      })
      return
    }

    const data = {
      name: response.data.full_name
    }

    this.setState({
      repositories: [...repositories, data],
      newRepository: '',
      loading: false,
      notFound: false
    })
  }

  render() {
    const { loading, newRepository, repositories, notFound } = this.state
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositories
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <InputRepository
            placeholder="Add repository"
            value={newRepository}
            onChange={this.handleInputChange}
            notFound={notFound}
          />

          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#FFFFFF" size={18} />
            ) : (
              <FaPlus color="#FFFFFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Details
              </Link>
            </li>
          ))}
        </List>
      </Container>
    )
  }
}

export default Main
