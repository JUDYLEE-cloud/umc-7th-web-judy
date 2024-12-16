import React from 'react';
import useCustomFetch from '../../hooks/useCustomFecth';

// 출연진 데이터 타입 정의
interface Actor {
  id: number;
  name: string;
  character: string;
  profile_path: string | null; // 일부 배우는 프로필 사진이 없을 수 있음
}

interface MovieCast {
  cast: Actor[];
}

// 컴포넌트 Props 타입 정의
interface CastListProps {
  movieId: number; // `movieId`는 숫자 타입
}

const CastList: React.FC<CastListProps> = ({ movieId }) => {
  const { data: movieCast, isLoading, isError } = useCustomFetch<MovieCast>(`/movie/${movieId}/credits`);

  if (isLoading) {
    return <div style={{ color: 'white' }}>로딩 중 입니다...</div>;
  }

  if (isError) {
    return <div style={{ color: 'white' }}>에러가 발생했습니다. 반복해서 발생 시 고객센터에 문의해주시기 바랍니다.</div>;
  }

  if (!movieCast) {
    return <div style={{ color: 'white' }}>출연진 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <div>
      <h2>Movie Cast</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {movieCast.cast.map((actor) => (
          <div key={actor.id} style={{ margin: '10px' }}>
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                alt={actor.name}
                style={{ borderRadius: '10px' }}
              />
            ) : (
              <div style={{ width: '200px', height: '300px', backgroundColor: '#ccc', borderRadius: '10px' }}>
                No Image
              </div>
            )}
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastList;
