import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faDownload, faDumbbell } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(116, 175, 223);
  padding: 50px;
  gap: 30px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 0px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 18px;
  text-align: center;
  max-width: 570px;
`;

const ImageContainer = styled.div`
  max-width: 300px;
  margin-bottom: 20px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  max-width: 500px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 5px;
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const FeatureGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const FeatureBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  width: 300px;
`;

const FeatureText = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const FeatureIcon = styled.span`
  font-size: 40px;
`;

const FeatureTitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export function HomePage() {
  const [selectedImage, setSelectedImage] = useState('https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs2/187440907/original/8ddb92f8cecfb95a76a4a2497a2c6b1bac155c03.jpg');

  return (
    <Container>
      <Title>Welcome to Exercise App</Title>
      <Description>
        Exercise app is a leading platform for health and exercise professionals.
        We provide a comprehensive set of tools and features to help you achieve your health and fitness goals.
      </Description>

      <ImageContainer>
        <PreviewImage src={selectedImage} alt="Selected" />
      </ImageContainer>

      <ButtonsContainer>
        <Button>Start your 30-day free trial</Button>
        <Button>Learn more about</Button>
      </ButtonsContainer>

      <Features>
        <FeatureTitle>Core Features</FeatureTitle>
        <FeatureGroup>
          <FeatureBox>
            <FeatureIcon>
              <FontAwesomeIcon icon={faBook} />
            </FeatureIcon>
            <FeatureText>Browse library of exercises</FeatureText>
            <Link to="/library">Learn More</Link>
          </FeatureBox>

          <FeatureBox>
            <FeatureIcon>
              <FontAwesomeIcon icon={faDumbbell} />
            </FeatureIcon>
            <FeatureText>Create your own exercises</FeatureText>
            <Link to="/create">Learn More</Link>
          </FeatureBox>

          <FeatureBox>
            <FeatureIcon>
              <FontAwesomeIcon icon={faDownload} />
            </FeatureIcon>
            <FeatureText>Save a list of exercises</FeatureText>
            <Link to="/save">Learn More</Link>
          </FeatureBox>
        </FeatureGroup>
      </Features>
    </Container>
  );
}
