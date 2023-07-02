import { Book, Download, Dumbbell } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/common/button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  gap: 30px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 18px;
  text-align: center;
  max-width: 570px;
  margin-bottom: 40px;
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
`;

const FeatureIcon = styled.span`
  font-size: 40px;
`;

const FeatureTitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 0px;
`;

export function HomePage() {
    const [selectedImage] = useState('https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs2/187440907/original/8ddb92f8cecfb95a76a4a2497a2c6b1bac155c03.jpg');

    return <Container>
        <Row>
            <div>
                <Title>Welcome to Exercise App</Title>
                <Description>
                    Exercise app is a leading platform for health and exercise professionals.
                    We provide a comprehensive set of tools and features to help you achieve your health and fitness goals.
                </Description>
                <ButtonsContainer>
                    <Button as={Link} to="/login" variant="primary" >Get Started</Button>
                    <Button as={Link} to="/exercises" variant="primary">Browse Exercises</Button>
                </ButtonsContainer>
            </div>
            <ImageContainer>
                <PreviewImage src={selectedImage} alt="Selected" />
            </ImageContainer>
        </Row>

        <Features>
            <FeatureTitle>Core Features</FeatureTitle>
            <FeatureGroup>
                <FeatureBox>
                    <FeatureIcon>
                        <Book />
                    </FeatureIcon>
                    <FeatureText>Browse library of exercises</FeatureText>
                </FeatureBox>

                <FeatureBox>
                    <FeatureIcon>
                        <Dumbbell />
                    </FeatureIcon>
                    <FeatureText>Create your own exercises</FeatureText>
                </FeatureBox>

                <FeatureBox>
                    <FeatureIcon>
                        <Download />
                    </FeatureIcon>
                    <FeatureText>Save a list of exercises</FeatureText>
                </FeatureBox>
            </FeatureGroup>
        </Features>
    </Container>;
}
