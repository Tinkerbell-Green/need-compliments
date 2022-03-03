import styled from "styled-components";

export const IconList = styled.ul`
  position: absolute;
  top:0;
  left:100%;
  transform: translateX(-100%);
  padding: 10px;
  display: flex;
  justify-content: flex-end;
`;

export const Icon = styled.div``;
export const IconPointer = styled.div`
  cursor: pointer;
`;

export const Container = styled.div`
  max-width: 280px;
  flex-direction: column;
  align-content: center;
  margin: 50px 10px;
`;

export const Profile = styled.div`
  flex-direction: column;
  margin-bottom: 30px;
`;

export const Name = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 14px;
`;
export const SubName = styled.div`
  font-size: 0.9rem;
`;

export const Feed = styled.div`
  flex-direction: column;
  > span {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 15px;
  }
`;



