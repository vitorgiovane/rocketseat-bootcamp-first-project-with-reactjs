import React, { Component } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { IssueContainer, IssueList, Loading, Owner } from './styles'
import Container from '../../components/container'
import Filter from '../../components/filter'

export default class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: true,
    activeFilter: 'all',
    filterOptions: ['all', 'open', 'closed']
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
          state: 'all',
          per_page: 20
        }
      })
    ])

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false
    })
  }

  handleFilterChange = async e => {
    const activeFilter = e.target.value
    this.setState({ loading: true, activeFilter })

    const issues = await api.get(
      `/repos/${this.state.repository.full_name}/issues`,
      {
        params: {
          state: activeFilter,
          per_page: 20
        }
      }
    )

    this.setState({
      issues: issues.data,
      loading: false,
      activeFilter
    })
  }

  render() {
    const {
      repository,
      issues,
      loading,
      activeFilter,
      filterOptions
    } = this.state

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

        <IssueContainer>
          <Filter active={activeFilter} onChange={this.handleFilterChange}>
            {filterOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Filter>

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
        </IssueContainer>
      </Container>
    )
  }
}
