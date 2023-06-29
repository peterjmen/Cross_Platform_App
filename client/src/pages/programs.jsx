import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { Button } from '../components/common/button';
import { Heading } from '../components/common/card';
import { Error, Input, Label, Form as _Form } from '../components/common/form';
import { Grid } from '../components/common/grid';
import { Row } from '../components/common/row';
import { ProgramCard } from '../components/program-card';
import { useApiUrl } from '../hooks/api';
import { CreateProgramPrompt } from '../components/prompts/create-program';

export function ProgramsPage() {
  // Search programs

  const form = useForm();
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  // 'null' indicates loading, empty array indicates no results
  const [programs, setPrograms] = useState(null);
  const [isCreateProgramPromptOpen, setIsCreateProgramPromptOpen] = useState(false);

  const handleCreateProgramSuccess = (result) => {
    console.log('Program created:', result);
  };

  const searchPrograms = useCallback(async ({ query }) => {
    setPrograms(null);
    setSearchParams(query ? { query } : {});

    return fetch(useApiUrl('programs', { query }))
      .then(response => response.json())
      .then(({ success, programs }) => success ? setPrograms(programs) : null)
      .catch(() => setError('Failed to search programs'));
  }, [setPrograms, setSearchParams]);

  // Main effect

  useEffect(() => {
    void searchPrograms({ query: searchParams.get('query') ?? '' });
  }, []);


  return (
    <Container>
      <Heading>Browse Programs</Heading>

      <Form onSubmit={form.handleSubmit(searchPrograms)}>
        <Row>
          <Label htmlFor="search-programs">Search Programs</Label>
          <Error error={error}>{error ?? 'Hello world'}</Error>
        </Row>

        <Row style={{ flexWrap: 'unset' }}>
          <Input
            id="search-programs"
            type="text"
            {...form.register('query')}
            placeholder="Type your search..."
          />
          <Button type="submit" variant="primary">
            Search
          </Button>
          <Button
            role="button"
            variant="primary"
            onClick={() => setIsCreateProgramPromptOpen(true)}
          >
            Create Program
          </Button>
        </Row>
      </Form>

      {programs === null && <>Loading...</>}

      {programs && (
        <Grid>
          {programs.map(program => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </Grid>
      )}


To pass both the onSuccess callback function and handleCreateProgramSuccess function to the CreateProgramPrompt component, you can modify the code as follows:

jsx
Copy code
{programs && (
  <Grid>
    {programs.map(program => (
      <ProgramCard key={program.id} program={program} />
    ))}
  </Grid>
)}

<CreateProgramPrompt
  onSuccess={program => {
    setPrograms([program, ...programs]);
    handleCreateProgramSuccess(program);
  }}
  isOpen={isCreateProgramPromptOpen}
  setIsOpen={setIsCreateProgramPromptOpen}
/>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
`;

const Form = styled(_Form)`
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;
