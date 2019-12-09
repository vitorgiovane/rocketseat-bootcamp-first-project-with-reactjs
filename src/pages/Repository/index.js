import React, { Component } from 'react'
import api from '../../services/api'
import PropTypes from 'prop-types'

export default class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: true
  }

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string
      })
    }).isRequired
  }

  async componentDidMount() {
    const { match } = this.props

    const repositoryName = decodeURIComponent(match.params.repository)

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repositoryName}`),
      api.get(`/repos/${repositoryName}/issues`, {
        params: {
          status: 'open',
          per_page: 5
        }
      })
    ])

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false
    })
  }

  render() {
    const { repository, issues, loading } = this.state
    return <h1>Repository:</h1>
  }
}
