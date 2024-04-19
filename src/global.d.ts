interface SpeechRecognition extends EventTarget {
  grammars: SpeechGrammarList;
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  serviceURI: string;
  onaudiostart: ((this: SpeechRecognitionEvent, ev: Event) => any) | null;
  onaudioend: ((this: SpeechRecognitionEvent, ev: Event) => any) | null;
  onend: ((this: SpeechRecognitionEvent, ev: Event) => any) | null;
  onerror:
    | ((this: SpeechRecognitionError, ev: SpeechRecognitionErrorEvent) => any)
    | null;
  onnomatch:
    | ((this: SpeechRecognitionEvent, ev: SpeechRecognitionEvent) => any)
    | null;
  onresult:
    | ((this: SpeechRecognitionEvent, ev: SpeechRecognitionEvent) => any)
    | null;
  onsoundstart: ((this: SpeechRecognitionEvent, ev: Event) => any) | null;
  onsoundend: ((this: SpeechRecognitionEvent, ev: Event) => any) | null;
  onspeechstart: ((this: SpeechRecognitionEvent, ev: Event) => any) | null;
  onspeechend: ((this: SpeechRecognitionEvent, ev: Event) => any) | null;
  onstart: ((this: SpeechRecognitionEvent, ev: Event) => any) | null;
  abort(): void;
  start(): void;
  stop(): void;
}
interface SpeechRecognitionError extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: SpeechRecognitionError;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
  readonly interpretation: any;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}
