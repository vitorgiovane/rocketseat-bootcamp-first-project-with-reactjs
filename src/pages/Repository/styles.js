import styled from 'styled-components'

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 6px;
    align-items: center;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 2px solid #eee;
      margin-right: 5px;
    }

    div {
      flex: 1;

      strong {
        font-size: 16px;
        display: flex;
        flex-wrap: wrap;

        a {
          text-decoration: none;
          color: #333;
          margin-right: 10px;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          padding: 3px 6px;
          background-color: #eee;
          margin-right: 5px;
          border-radius: 6px;
          font-size: 12px;
        }
      }

      p {
        margin-top: 5px;
        color: #999;
        font-size: 12px;
      }
    }
  }
`

export const Loading = styled.div`
  color: #ffffff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 16px;
    color: #333333;
  }

  p {
    margin-top: 10px;
    font-size: 14px;
    color: #666666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`
