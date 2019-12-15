import styled from 'styled-components'

const Filter = styled.select.attrs(props => ({
  value: props.active
}))`
  background: transparent;
  width: 200px;
  padding: 10px;
  border: 1px solid #eee;
  font-size: 16px;
  color: #7159c1;
  margin-bottom: 30px;
  border-radius: 3px;
`

export default Filter
