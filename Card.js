import React from 'react';

const Card = ({ title }) => (
  <ListItem>
    <CardTitle>{ title }</CardTitle>
  </ListItem>
)

export const YellowCard = ({ title }) => (
  <YellowListItem>
    <CardTitle>{ title }</CardTitle>
  </YellowListItem>
)

export const AlertableCard = ({ title }) => (
  <AlertableListItem hasError>
    <CardTitle>{ title }</CardTitle>
  </AlertableListItem>
)

export default Card