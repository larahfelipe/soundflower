import styled from 'styled-components/native';

export const Wrapper = styled.View`
  width: 80%;

  margin-left: 20px;
`;

export const InputField = styled.TextInput`
  padding: 12px 18px;

  font-size: 18px;
  border-radius: 10px;

  color: ${({ theme }) => theme.colors.title};
  background-color: ${({ theme }) => theme.colors.backgroundLight};
`;
