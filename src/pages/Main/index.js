import React, { Component } from 'react'
import { Container, Form, List, SubmitButton } from './styles'
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'

import api from '../../services/api'

class Main extends Component {
  state = {
    newRepository: '',
    repositories: [],
    loading: false
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
    const response = await api.get(`/repos/${newRepository}`)

    const data = {
      name: response.data.name
    }

    this.setState({
      repositories: [...repositories, data],
      newRepository: '',
      loading: false
    })
  }

  render() {
    const { loading, newRepository, repositories } = this.state
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositories
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add repository"
            value={newRepository}
            onChange={this.handleInputChange}
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
              <a href="#">Details</a>
            </li>
          ))}
        </List>
      </Container>
    )
  }
}

export default Main
