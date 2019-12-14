import React, { Component } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { IssueList, Loading, Owner } from './styles'
import Container from '../../components/container'

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

    if (loading) {
      return <Loading>Loading...</Loading>
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Back to repositories</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <a
                href={issue.user.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={issue.user.avatar_url} alt={issue.user.login} />
              </a>
              <div>
                <strong>
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {issue.title}
                  </a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    )
  }
}
