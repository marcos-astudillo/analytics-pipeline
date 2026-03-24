export interface Event {
  event_id: string;
  type: string;
  user_id?: string;
  ts: string;
  props: Record<string, any>;
}
