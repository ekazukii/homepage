import { useTranslation } from "next-i18next";

import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { widget } = service;

  const { data: lolData, error: lolError } = useWidgetAPI(widget, "getSummonerInfo");

  const { t } = useTranslation();

  if (lolError) {
    return <Container service={service} error={lolError} />;
  }

  if (!lolData || lolData.length === 0) {
    return (
      <Container service={service}>
        <Block label="leagueoflegends.username" />
        <Block label="leagueoflegends.flexrank" />
        <Block label="leagueoflegends.soloqueuerank" />
        <Block label="leagueoflegends.winrate" />
      </Container>
    );
  }

  let username;
  let flexRank;
  let soloQueueRank;
  let wins = 0;
  let losses = 0;

  lolData.forEach((data) => {
    if (data.queueType === "RANKED_FLEX_SR") {
      flexRank = `${data.tier} ${data.rank} ${data.leaguePoints}LP`;
      if (data.summonerName) username = data.summonerName;
      wins += parseInt(data.wins, 10);
      losses += parseInt(data.losses, 10);
    } else if (data.queueType === "RANKED_SOLO_5x5") {
      soloQueueRank = `${data.tier} ${data.rank} ${data.leaguePoints}LP`;
      if (data.summonerName) username = data.summonerName;
      wins += parseInt(data.wins, 10);
      losses += parseInt(data.losses, 10);
    }
  });

  if (losses === 0) losses = 1;

  return (
    <Container service={service}>
      <Block label="leagueoflegends.username" value={username} />
      <Block label="leagueoflegends.flexrank" value={flexRank} />
      <Block label="leagueoflegends.soloqueuerank" value={soloQueueRank} />
      <Block label="leagueoflegends.winrate" value={t("common.percent", { value: (wins / (wins + losses)) * 100 })} />
    </Container>
  );
}
