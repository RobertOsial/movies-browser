import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useSelector } from "react-redux";
import { PersonTile } from "../../../../common/PersonTile";
import { Title } from "../../../../common/Title";
import { APIimageUrl } from "../../../APIdata";
import { selectMovieCast } from "../movieDetailsSlice";
import { Arrow, Container, ShowAllButton } from "../../../../common/ShowAllContainer";
import { PeopleWrapper } from "../../../../common/PeopleWrapper";

export const Cast = () => {
  const cast = useSelector(selectMovieCast);

  const [isAllCastShown, setIsAllCastShown] = useState(false);

  const toggleIsAllCastShown = () => setIsAllCastShown(isAllCastShown => !isAllCastShown);

  const castShown = isAllCastShown ? cast.length : 10;

  if (cast.length !== 0) {
    return (
      <article>
        <Title>Cast</Title>
        <PeopleWrapper>
          {cast.slice(0, castShown).map(person => (
            <PersonTile
              key={nanoid()}
              profileImage={`${APIimageUrl}/w185${person.profile_path}`}
              profilePath={person.profile_path}
              fullName={person.name}
              character={person.character}
              id={person.id}
            />
          ))}
        </PeopleWrapper>
        {cast.length >= 10 && (
          <Container>
            <ShowAllButton
              onClick={toggleIsAllCastShown}
              isAllShown={isAllCastShown}
            >
              {isAllCastShown && <Arrow> ⇑ </Arrow>}
              {isAllCastShown ? "Hide" : "Show all"}
              {!isAllCastShown && <Arrow> ⇓</Arrow>}
            </ShowAllButton>
          </Container>
        )}
      </article>
    );
  } else return null;
};