import { Live } from "fpl-api";
import { NewBootstrap } from "../types/Types";

export async function fetchBootstrap(): Promise<NewBootstrap> {
  const response = await fetchPublicEndpoint("bootstrap-static/");
  return await response.json();
}

export async function fetchLive(eventId: number): Promise<Live> {
  const response = await fetchPublicEndpoint(`event/${eventId}/live/`);
  return response.json();
}

async function fetchPublicEndpoint(endpoint: string): Promise<Response> {
  const response = await fetch(`http://localhost:8080/fpl/${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.log(response.json());
  }
  return response;
}
