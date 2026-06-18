"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";


enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      console.log("Interview ended");

      setCallStatus(CallStatus.FINISHED);

      setTimeout(() => {
        router.push("/");
      }, 1000);
    };
    const onMessage = (message: Message) => {
      if (
        message.type === "transcript" &&
        message.transcriptType === "final"
      ) {
        setLastMessage(message.transcript);
      }
    };

    const onSpeechStart = () => {

      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {

      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.log("Error:", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);


  const handleCall = async () => {
    if (callStatus === CallStatus.CONNECTING) return;

    try {
      setCallStatus(CallStatus.CONNECTING);

      await vapi.start(
        process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!
      );
    } catch (error) {
      console.error(error);
      setCallStatus(CallStatus.INACTIVE);
    }
  };


  const handleDisconnect = () => {
    vapi.stop();
  };
  return (
    <>
      <div className="call-view">
        {/* AI Interviewer Card */}
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="profile-image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        {/* User Profile Card */}
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {lastMessage && (
        <div className="transcript-border">
          <div className="transcript">
            <div className="flex gap-2 items-start">
              <span>🤖</span>
              <p className="animate-fadeIn">
                {lastMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mt-4">
        {callStatus === CallStatus.CONNECTING && (
          <p className="text-yellow-400">Connecting...</p>
        )}

        {callStatus === CallStatus.ACTIVE && (
          <p className="text-green-400">
            {isSpeaking ? "🎤 AI Speaking..." : "🎧 Listening..."}
          </p>
        )}
      </div>

      <div className="flex justify-center mt-6">
        {callStatus !== CallStatus.ACTIVE ? (
          <button
            onClick={handleCall}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg"
          >
            Start Interview
          </button>
        ) : (
          <button
            onClick={handleDisconnect}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg"
          >
            End Interview
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;