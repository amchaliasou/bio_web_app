import {  useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useStores } from "stores/rootStore";

export const useDisease = () => {
  const navigate = useNavigate();
  const { diseaseStore } = useStores();
  const { umlsCui } = useParams<{ umlsCui: string }>();



  useLayoutEffect(() => {
    if (!umlsCui) return navigate("/");
    diseaseStore.getDiseaseExtended(umlsCui);

    return () => {
      diseaseStore.clearDisease();
    };
  }, [umlsCui]);
};
