import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getLessonByRoomId } from "@/data/lessons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Message = { id: string; author: string; text: string; ts: number };

const LiveRoom = () => {
  const { roomId } = useParams();
  const [title, setTitle] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!roomId) return;
    getLessonByRoomId(roomId).then(lesson => setTitle(lesson?.title ?? `Room ${roomId}`));
  }, [roomId]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: String(Date.now()), author: "You", text: input.trim(), ts: Date.now() }]);
    setInput("");
  };

  return (
    <div className="container mx-auto p-4 grid gap-4 md:grid-cols-3">
      <div className="md:col-span-2 space-y-3">
        <Card>
          <CardContent className="p-2 grid grid-cols-2 gap-2">
            <video ref={localVideoRef} className="w-full bg-black aspect-video rounded" autoPlay muted playsInline />
            <video ref={remoteVideoRef} className="w-full bg-black aspect-video rounded" autoPlay playsInline />
          </CardContent>
        </Card>
        <div className="flex items-center gap-3 overflow-x-auto py-1">
          {["Teacher T", "Student A", "Student B", "Student C", "Student D"].map((name, idx) => (
            <div key={idx} className="flex items-center gap-2 px-2 py-1 bg-card border rounded-full">
              <Avatar className="h-6 w-6">
                <AvatarImage src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(name)}`} alt={name} />
                <AvatarFallback>{name.split(" ").map(s => s[0]).join("")}</AvatarFallback>
              </Avatar>
              <span className="text-xs pr-2">{name}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="default">Toggle Mic</Button>
          <Button variant="secondary">Toggle Camera</Button>
          <Button variant="outline">Share Screen</Button>
          <Button variant="destructive">Leave</Button>
        </div>
        <div className="text-sm text-muted-foreground">{title}</div>
      </div>

      <Card>
        <CardContent className="p-3 h-full flex flex-col">
          <div className="font-medium mb-2">Chat & Q&A</div>
          <div className="flex-1 overflow-auto space-y-2">
            {messages.map(m => (
              <div key={m.id} className="text-sm"><span className="font-semibold">{m.author}: </span>{m.text}</div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <input className="flex-1 border rounded px-2 py-1" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask a question or chat..." />
            <Button onClick={handleSend}>Send</Button>
          </div>
          <div className="mt-2 flex gap-2">
            <Button variant="outline">👍</Button>
            <Button variant="outline">✋</Button>
            <Button variant="outline">👏</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveRoom;


