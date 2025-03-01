import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const { data: memes, error } = useSWR("/api/memes", fetcher, {
  revalidateOnFocus: false,
  dedupingInterval: 60000, // Cache for 1 min
});
