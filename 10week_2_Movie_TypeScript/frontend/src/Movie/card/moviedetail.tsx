import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import '../../variable.css';

const fetchMovieDetail = async (movieId: string) => {
    const token = import.meta.env.VITE_API_TOKEN; // Vite 환경 변수 사용
    console.log('Token:', token); // 토큰 확인용 로그
    if (!token) {
        throw new Error('API 토큰이 설정되지 않았습니다.');
    }

    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log('Movie Detail Response:', response.data); // 응답 데이터 확인
    return response.data;
};

const fetchMovieCast = async (movieId: string) => {
    const token = import.meta.env.VITE_API_TOKEN; // 동일하게 Vite 환경 변수 사용
    console.log('Token:', token); // 토큰 확인용 로그
    if (!token) {
        throw new Error('API 토큰이 설정되지 않았습니다.');
    }

    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log('Movie Cast Response:', response.data); // 응답 데이터 확인
    return response.data;
};

// TypeScript 타입 정의
interface MovieDetailType {
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    backdrop_path: string;
}

interface CastMemberType {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

interface CrewMemberType {
    id: number;
    name: string;
    job: string;
    profile_path: string | null;
}

interface MovieCastType {
    cast: CastMemberType[];
    crew: CrewMemberType[];
}

const MovieDetail: React.FC = () => {
    const { movieId } = useParams<{ movieId: string }>();
    // const location = useLocation();
    // const { movie } = (location.state || {}) as { movie?: MovieDetailType };

    // 영화 상세 정보 가져오기
    const { data: movieDetail, isLoading: isDetailLoading, isError: isDetailError } = useQuery<MovieDetailType>({
        queryKey: ['movieDetail', movieId],
        queryFn: () => fetchMovieDetail(movieId!),
        enabled: !!movieId,
    });

    // 영화 출연진 정보 가져오기
    const { data: movieCast, isLoading: isCastLoading, isError: isCastError } = useQuery<MovieCastType>({
        queryKey: ['movieCast', movieId],
        queryFn: () => fetchMovieCast(movieId!),
        enabled: !!movieId,
    });

    if (isDetailLoading || isCastLoading) {
        return <div style={{ color: 'white' }}>로딩 중 입니다...</div>;
    }

    if (isDetailError || isCastError) {
        return <div style={{ color: 'white' }}>에러가 발생했습니다. 반복해서 발생 시 고객센터에 문의해주시기 바랍니다.</div>;
    }

    if (!movieDetail || !movieCast) {
        return <div style={{ color: 'white' }}>영화 정보를 불러오지 못했습니다.</div>;
    }

    const backdropUrl = `https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}`;
    const director = movieCast.crew.find(member => member.job === 'Director');

    return (
        <>
            <DetailWrapper>
                <Backdrop $backdropUrl={backdropUrl} />
                <DetailContent>
                    <DetailTitle>{movieDetail.title}</DetailTitle>
                    <DetailOverview>{movieDetail.overview}</DetailOverview>
                    <DetailReleaseDate><strong>Release Date:</strong> {movieDetail.release_date}</DetailReleaseDate>
                    <DetailRate><strong>Rating:</strong> {movieDetail.vote_average}/10</DetailRate>
                </DetailContent>
            </DetailWrapper>

            <H2>Movie Cast</H2>
            <CastWrapper>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {director && (
                        <CastCard key={director.id}>
                            <CastImg
                                src={director.profile_path
                                    ? `https://image.tmdb.org/t/p/w200/${director.profile_path}`
                                    : 'https://www.smilisticdental.com/wp-content/uploads/2017/11/blank-profile-picture-973460_960_720.png'}
                                alt={director.name}
                            />
                            <ActorName>Director: {director.name}</ActorName>
                        </CastCard>
                    )}
                    {movieCast.cast.map((actor) => (
                        <div key={actor.id} style={{ margin: '10px' }}>
                            <CastCard>
                                <CastImg
                                    src={actor.profile_path
                                        ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                                        : `https://www.smilisticdental.com/wp-content/uploads/2017/11/blank-profile-picture-973460_960_720.png`}
                                    alt={actor.name}
                                    style={{ borderRadius: '10px' }}
                                />
                                <ActorName>{actor.name}</ActorName>
                                <CharacterName>{actor.character}</CharacterName>
                            </CastCard>
                        </div>
                    ))}
                </div>
            </CastWrapper>
        </>
    );
}; 

export default MovieDetail;

// 전체를 감싸는 요소
const DetailWrapper = styled.div `
  position: relative;
  width: 100%;
  margin: 0 auto;
  color: var(--text-color);
  overflow: hidden;
  border-radius: 8px;
  height: 500px;
;`

//배경 이미지
const Backdrop = styled.div<{ $backdropUrl: string }>`
    /* position: absolute; */
    top: 0;
    left: 0;
    height: 100%;

    background-color: black;
    background: linear-gradient(to right, black 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%), url(${props => props.$backdropUrl});
    background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;

  mask-image: linear-gradient(to bottom right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    `;

const DetailContent = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;

  background-color: rgba(0, 0, 0, 0.5); /* 글씨 뒤 반투명 배경 /
  padding: 20px;
  border-radius: 8px;
  max-width: 600px; / 텍스트 영역 크기 조절 */
`;

// 제목
const DetailTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
;`

// 영화 설명
const DetailOverview = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 20px;
  text-align: justify;
;`

// 출시 날짜
const DetailReleaseDate = styled.span`
  font-size: 0.9rem;
  margin-bottom: 10px;
  display: block;
  strong {
    font-weight: bold;
  }
;`

// 영화 평점
const DetailRate = styled.span`
  font-size: 0.9rem;
  display: block;
  margin-bottom: 10px;
  strong {
    font-weight: bold;
  }
;`

// 캐스트 제목
const H2 = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: var(--logo-color);
`;

// 캐스트 정보
const CastWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
;`

// 캐스트 카드 (사진+이름+캐릭터이름)
const CastCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 10px;

  width: 80px;
  height: 200px;
  word-wrap: break-words;
  overflow: hidden;
;`

// 캐스트 이미지
const CastImg = styled.img`
  margin-top: 5px;
  border-radius: 50%;
  height: 80px;
  width: 80px;
  object-fit: cover;
  border: var(--text-color) 2px solid;
`;

//캐스트 이름
const ActorName = styled.p`
  font-size: 1rem;
  color: var(--text-color);
  margin-bottom: 6px;
;`
//캐릭터 이름
const CharacterName = styled.p`
  font-size: 0.85rem;
  color: var(--secondary-text-color);
  margin: 0px;
;`