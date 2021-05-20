import styled from 'styled-components';

const DetailsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 2.6em 6px 0 6px;
    line-height: 1.4;
`;

const MediumText = styled.span`
  font-size: 18px;
  color: #fff;
  font-weight: 800;
  text-transform: uppercase;
`;
const UltraSmall = styled.span`
  font-size: 10px;
  color: #fff;
  font-weight: 800;
  margin-bottom: 1.2em;
  text-transform: uppercase;
`;

const SmallText = styled.span`
  font-size: 15px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
`;

const SpacedHorizontalContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export function Bookdetails(props){
    return <DetailsContainer>
        <SmallText style={{color: "#ff17a3"}}>
          69 KM Away
        </SmallText>
        <SpacedHorizontalContainer >
            <MediumText style={{color: "white"}}>Charlie and The Chocholate Factory</MediumText>
        </SpacedHorizontalContainer>
        <SmallText style={{color: "#d6d6d6"}}>            
            Author
        </SmallText>
        <UltraSmall  style={{color: "grey"}}>            
            Description - this is a very good book 
            best in the world, gaurav mandal is good boy.
            he loves to make videos, 
            he loves to rap.
        </UltraSmall>
    </DetailsContainer>
};