import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { Section } from "../../../common/Section";
import { Title } from "../../../common/Title";
import { PersonTile } from "../../../common/PersonTile";
import { Error } from "../../../common/Error";
import { Loader } from "../../../common/Loader";
import { PeopleWrapper } from "../../../common/PeopleWrapper";
import { MainContainer } from "../../../common/MainContainer";
import {
  fetchPeople,
  fetchPeopleSearch,
  selectError,
  selectLoading,
  selectPeopleList,
  selectTotalPages,
  selectTotalResults,
} from "./peopleSlice";
import { APIimageUrl } from "../../APIdata";
import { Pagination } from "../../../common/Pagination";
import { useQueryParameter } from "../../../common/queryParameterHooks";
import { queryParameters } from "../../../common/queryParameters";
import { NoResultsPage } from "../../../common/NoResultsPage";
import { capitalize } from "../../capitalize";

export const PersonList = () => {
  const dispatch = useDispatch();
  const query = useQueryParameter(queryParameters.search);

  const paramsPage = +useQueryParameter(queryParameters.page);
  const page = paramsPage === 0 ? 1 : paramsPage;

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const people = useSelector(selectPeopleList);
  const totalResults = useSelector(selectTotalResults);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    query
      ? dispatch(fetchPeopleSearch({ query, page }))
      : dispatch(fetchPeople({ query, page }));
  }, [dispatch, query, page]);

  return (
    <MainContainer>
      {query && totalResults === 0
        ? <NoResultsPage query={query} />
        : error
          ? <Section>
            <Error />
          </Section>
          : loading
            ? <Section>
              <Title>
                {query
                  ? `Search results for "${capitalize(query)}"`
                  : "Popular people"
                }
              </Title>
              <Loader />
            </Section>
            : error
              ? <Section>
                <Error />
              </Section>
              : <>
                <Section>
                  <Title>
                    {query
                      ? `Search results for "${capitalize(query)} (${totalResults})"`
                      : "Popular people"
                    }
                  </Title>
                  <PeopleWrapper>
                    {people.map((person) => (
                      <PersonTile
                        key={nanoid()}
                        profileImage={`${APIimageUrl}/w185${person.profile_path}`}
                        profilePath={person.profile_path}
                        fullName={person.name}
                        id={person.id}
                      />
                    ))}
                  </PeopleWrapper>
                </Section>
                <Pagination totalPages={totalPages} page={page} />
              </>
      }
    </MainContainer >
  );
};