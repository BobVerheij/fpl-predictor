import { Fixture, Live } from "fpl-api";
import { NewBootstrap } from "../types/Types";

const url = "https://api.prtrt.nl/fpl/";

export async function fetchBootstrap(): Promise<NewBootstrap> {
  const response = await fetchPublicEndpoint("bootstrap-static/");
  return await response.json();
}

export async function fetchLive(eventId: number): Promise<Live> {
  const response = await fetchPublicEndpoint(`event/${eventId}/live/`);
  return response.json();
}

export async function fetchFixtures(): Promise<Fixture[]> {
  const response = await fetchPublicEndpoint(`fixtures/`);
  return response.json();
}

async function fetchPublicEndpoint(endpoint: string): Promise<Response> {
  const response = await fetch(`${url}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
  }
  return response;
}
