import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Container = styled.div`
    grid-area: rightside;
    margin-left: 1050px;
    width: 350px;
    position: fixed;

    @media (max-width: 768px){
        margin-right: 0;
        position: relative;
        margin-left: 0;
        width: 100%;
    }
`

export const FollowCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  padding: 12px;
`;

export const Title = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.6);
    width: 100%;
`

export const FeedList = styled.ul`
  margin-top: 16px;
  li {
    display: flex;
    align-items: center;
    margin: 12px 0;
    position: relative;
    font-size: 14px;
    & > div {
      display: flex;
      flex-direction: column;
    }

    button {
      background-color: transparent;
      color: rgba(0, 0, 0, 0.6);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
      padding: 16px;
      align-items: center;
      border-radius: 15px;
      box-sizing: border-box;
      font-weight: 600;
      display: inline-flex;
      justify-content: center;
      max-height: 32px;
      max-width: 480px;
      text-align: center;
      outline: none;
      border: none;
    }
  }
`;

export const Avatar = styled.div`
    background-image: url("https://static-exp1.licdn.com/sc/h/1b4vl1r54ijmrmcyxzoidwmxs");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 48px;
    height: 48px;
    margin-right: 8px;
`

export const Recommendation = styled(Link)`
    color: #0a66c2;
    display: flex;
    align-items: center;
    font-size: 14px;
    text-decoration: none;
`

export const BannerCard = styled(FollowCard)`
    img{
        width: 100%;
        height: 100%;
    }
`