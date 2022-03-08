import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import {
  Container, FormContainer, FormDelete, FormHeading, FormLabel,
} from '../../components/styledComponents';

import { GET_USER_BY_TOKEN, DELETE_USER } from '../../graphql/queries';

function Dashboard() {
  const { loading, error, data } = useQuery(GET_USER_BY_TOKEN);

  const [DeleteUserByEmail] = useMutation(DELETE_USER);
  const onDelete = async (email: string) => {
    localStorage.removeItem('token');
    await DeleteUserByEmail({
      variables: {
        email,
      },
    });
    window.location.reload();
  };

  if (loading) { return <span>loading...</span>; }

  return (
    <Container>
      <FormContainer className="container card pb-5 mb-5" id="dash-main">
        <div className="card-body">

          <div className="row">
            {data?.getUserByToken && (
            <div>
              <FormHeading id="dashboard-name" data-testid="dashboard-name">
                { `Welcome, ${data.getUserByToken.firstName}`}
              </FormHeading>
              <div className="row">
                <FormLabel className="text-justify font-monospace">{`First Name: ${data.getUserByToken.firstName}`}</FormLabel>
                <FormLabel className="text-justify font-monospace">{`Last Name: ${data.getUserByToken.lastName}`}</FormLabel>
                <FormLabel className="text-justify font-monospace">{`Email: ${data.getUserByToken.email}`}</FormLabel>
                <FormLabel className="text-justify font-monospace">{`Phone Number: ${data.getUserByToken.phoneNumber}`}</FormLabel>
              </div>
              <FormDelete
                type="button"
                id="delete-user"
                style={{ opacity: '0' }}
                className="row btn btn-sm btn-danger"
                name={data.getUserByToken.email}
                onClick={() => onDelete(data.getUserByToken.email)}
              >
                Delete User
              </FormDelete>
            </div>
            )}
          </div>
          {error && (
          <pre className="text-danger">
            Bad:
            {error?.graphQLErrors.map(({ message }, i) => (
              <span className="text-danger" id="dash-error" key={i}>
                {message}
              </span>
            ))}
          </pre>
          )}
        </div>
      </FormContainer>
    </Container>
  );
}

export default Dashboard;
