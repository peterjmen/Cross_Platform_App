//(info, do not remove: This fine is C:\Github\cross_plat_working\client\src\pages\CatalogueStyles.js)

import styled from 'styled-components';

export const PageContainer = styled.div`
  margin: 20px auto;
  max-width: 800px;
`;

export const Heading = styled.h1`
  color: #0099ff;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #888888;
  border-radius: 4px;
  margin-bottom: 20px;
`;

export const TableContainer = styled.div`
  max-height: 180px;
  overflow-y: scroll;
  border: 1px solid #888888;
  margin-bottom: 20px;
`;

export const CatalogueTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  padding: 8px;
  background-color: #0099ff;
  color: #ffffff;
  font-weight: bold;
  border-bottom: 1px solid hsl(var(--border-color));
  text-align: left;
`;

export const TableData = styled.td`
  padding: 8px;
  border-bottom: 1px solid hsl(var(--border-color));
  vertical-align: middle;
`;

export const CheckboxInput = styled.input`
  margin-right: 5px;
`;

export const RemoveButton = styled.button`
  background-color: red;
  font-weight: bold;
  border: none;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const SelectedExercisesContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 50px;
`;

export const SelectedExercisesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const FormContainer = styled.div`
  margin-bottom: 20px;
  width: 70%;
  margin: auto;
  background-color: #0099ff;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

export const FormTitle = styled.h2`
  color: white;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  text-decoration: underline;
  font-size: 120%;
`;


export const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #888888;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const FormButton = styled.button`
  background-color: white;
  color: #0099ff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  display: block; /* Added display: block to center the button */
  margin: 0 auto; /* Added margin: 0 auto to center the button */
`;

export const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const DescriptionText = styled.span`
  flex-grow: 1;
`;

export const CollapseButton = styled.span`
  background-color: #0099ff;
  font-weight: bold;
  color: white;
  padding: 4px;
  border-radius: 50%;
  margin-left: 5px;
  cursor: pointer;
`;

export const ExpandButton = styled.span`
  background-color: #0099ff;
  font-weight: bold;
  color: white;
  padding: 4px;
  border-radius: 50%;
  margin-left: 5px;
  cursor: pointer;
`;
