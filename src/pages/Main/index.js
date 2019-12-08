import React from 'react'
import { Container, Form, SubmitButton } from './styles'
import { FaGithubAlt, FaPlus } from 'react-icons/fa'

const Main = () => (
  <Container>
    <h1>
      <FaGithubAlt />
      Repositories
    </h1>

    <Form onSubmit={() => {}}>
      <input type="text" placeholder="Add repository" />
      <SubmitButton disabled={false}>
        <FaPlus color="#FFFFFF" size={14} />
      </SubmitButton>
    </Form>
  </Container>
)

export default Main
