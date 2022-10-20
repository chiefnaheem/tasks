import https from "https";

// types
type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};
type ResponseType = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Episode[];
};

type FinalArrEpisode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Record<string, any>[];
  url: string;
  created: string;
};

async function fetchJSON(url: string) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        resolve(JSON.parse(data));
      });
    });
  });
}

async function executeTask() {
  const finalArray: FinalArrEpisode[] = [];

  let next: string | null = "https://rickandmortyapi.com/api/episode";
  do {
    let { info, results: episodes } = (await fetchJSON(next)) as ResponseType;
    for (let episode of episodes) {
      const { characters } = episode;
      const characterObjects = (await Promise.all(
        characters.map((characterUrl) => fetchJSON(characterUrl))
      )) as Record<string, any>[];
      const transformedEpisode: FinalArrEpisode = {
        ...episode,
        characters: characterObjects,
      };
      finalArray.push(transformedEpisode);
    }

    next = info.next;
  } while (next !== null);

  console.log(finalArray);
}

executeTask();
