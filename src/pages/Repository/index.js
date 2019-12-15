import React, { Component } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  IssueContainer,
  IssueList,
  IssuesNavigation,
  Loading,
  Owner
} from './styles'
import Container from '../../components/container'
import Filter from '../../components/filter'

export default class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: true,
    issuesState: 'all',
    issuesStateOptions: ['all', 'open', 'closed'],
    page: 1
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
          per_page: 20,
          page: 1
        }
      })
    ])

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false
    })
  }

  loadIssues = async () => {
    const { repository, issuesState, page } = this.state

    const issues = await api.get(`/repos/${repository.full_name}/issues`, {
      params: {
        state: issuesState,
        per_page: 20,
        page
      }
    })

    this.setState({
      issues: issues.data,
      loading: false,
      issuesState
    })
  }

  handleFilterChange = async e => {
    const issuesState = e.target.value
    await this.setState({ loading: true, issuesState, page: 1 })

    this.loadIssues()
  }

  handlePage = async action => {
    let { page } = this.state
    page = action === 'previous' ? --page : ++page

    await this.setState({ loading: true, page })

    this.loadIssues()
  }

  render() {
    const {
      repository,
      issues,
      loading,
      issuesState,
      issuesStateOptions
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
          <Filter active={issuesState} onChange={this.handleFilterChange}>
            {issuesStateOptions.map(option => (
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
        <IssuesNavigation>
          <div>
            {this.state.page > 1 && (
              <button onClick={() => this.handlePage('previous')}>
                Previous
              </button>
            )}
          </div>

          <button onClick={() => this.handlePage('next')}>Next</button>
        </IssuesNavigation>
        {/* { this.state.page !== 1 ? <a href=""></a>} */}
      </Container>
    )
  }
}
