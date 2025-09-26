import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, Paperclip, Phone, Video, User, Clock, CheckCheck, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: number;
  sender: "patient" | "provider";
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
  urgent?: boolean;
  attachment?: {
    name: string;
    type: string;
    size: string;
  };
}

interface Conversation {
  id: number;
  providerName: string;
  providerTitle: string;
  specialty: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
  avatar?: string;
}

export function SecureMessaging() {
  const [selectedConversation, setSelectedConversation] = useState<number>(1);
  const [newMessage, setNewMessage] = useState("");

  const conversations: Conversation[] = [
    {
      id: 1,
      providerName: "Dr. Martinez",
      providerTitle: "Dr. Elena Martinez",
      specialty: "Cardiologist",
      lastMessage: "Your latest test results look great! Let's discuss during our next...",
      lastMessageTime: "2024-01-15T14:30:00",
      unreadCount: 0,
      online: true
    },
    {
      id: 2,
      providerName: "Lisa Chen, RN",
      providerTitle: "Lisa Chen",
      specialty: "Cardiac Rehabilitation Nurse",
      lastMessage: "I've updated your exercise plan. Please review the new routine...",
      lastMessageTime: "2024-01-15T09:15:00",
      unreadCount: 2,
      online: false
    },
    {
      id: 3,
      providerName: "Dr. Johnson",
      providerTitle: "Dr. Michael Johnson",
      specialty: "Cardiologist",
      lastMessage: "Thank you for sharing your daily readings. Everything looks...",
      lastMessageTime: "2024-01-14T16:45:00",
      unreadCount: 0,
      online: false
    }
  ];

  const messages: Message[] = [
    {
      id: 1,
      sender: "provider",
      senderName: "Dr. Martinez",
      content: "Good morning, Sarah! I hope you're feeling well today. I wanted to follow up on your exercise progress from last week.",
      timestamp: "2024-01-15T09:00:00",
      read: true
    },
    {
      id: 2,
      sender: "patient",
      senderName: "You",
      content: "Good morning, Dr. Martinez! I'm feeling much better. I've been keeping up with the exercise routine and my energy levels have improved significantly.",
      timestamp: "2024-01-15T09:15:00",
      read: true
    },
    {
      id: 3,
      sender: "provider",
      senderName: "Dr. Martinez",
      content: "That's wonderful to hear! Your commitment to the rehabilitation program is really paying off. I've reviewed your latest vital signs, and everything looks excellent.",
      timestamp: "2024-01-15T09:30:00",
      read: true
    },
    {
      id: 4,
      sender: "provider",
      senderName: "Dr. Martinez",
      content: "I've attached your latest lab results for your review. All markers are within normal ranges, which is exactly what we want to see at this stage of your recovery.",
      timestamp: "2024-01-15T14:30:00",
      read: true,
      attachment: {
        name: "Lab_Results_Jan_2024.pdf",
        type: "PDF",
        size: "245 KB"
      }
    }
  ];

  const currentConversation = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Logic to send message would go here
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Secure Messages</h1>
          <p className="text-muted-foreground">HIPAA-compliant communication with your care team</p>
        </div>
        <Button className="bg-primary">
          <MessageSquare className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Conversations</CardTitle>
            <CardDescription>Your care team messages</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedConversation === conversation.id ? 'bg-muted border-l-4 border-l-primary' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>
                          {conversation.providerName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate">{conversation.providerName}</p>
                        {conversation.unreadCount > 0 && (
                          <Badge variant="destructive" className="h-5 w-5 p-0 text-xs flex items-center justify-center">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{conversation.specialty}</p>
                      <p className="text-xs text-muted-foreground truncate mt-1">{conversation.lastMessage}</p>
                      <p className="text-xs text-muted-foreground mt-1">{formatTimestamp(conversation.lastMessageTime)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Thread */}
        <Card className="lg:col-span-3 flex flex-col">
          {currentConversation && (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {currentConversation.providerName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {currentConversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{currentConversation.providerTitle}</h3>
                      <p className="text-sm text-muted-foreground">{currentConversation.specialty}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${currentConversation.online ? 'bg-success' : 'bg-muted'}`}></div>
                        <span className="text-xs text-muted-foreground">
                          {currentConversation.online ? 'Online' : 'Last seen 2 hours ago'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${
                      message.sender === 'patient' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    } rounded-lg p-3 space-y-2`}>
                      {message.sender === 'provider' && (
                        <div className="flex items-center space-x-2">
                          <User className="h-3 w-3" />
                          <span className="text-xs font-medium">{message.senderName}</span>
                        </div>
                      )}
                      
                      <p className="text-sm">{message.content}</p>
                      
                      {message.attachment && (
                        <div className={`border rounded-lg p-2 ${
                          message.sender === 'patient' 
                            ? 'border-primary-foreground/20 bg-primary-foreground/10' 
                            : 'border-border bg-background'
                        }`}>
                          <div className="flex items-center space-x-2">
                            <Paperclip className="h-4 w-4" />
                            <div>
                              <p className="text-xs font-medium">{message.attachment.name}</p>
                              <p className="text-xs text-muted-foreground">{message.attachment.type} • {message.attachment.size}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs opacity-70">{formatTimestamp(message.timestamp)}</span>
                        {message.sender === 'patient' && (
                          <CheckCheck className={`h-3 w-3 ${message.read ? 'text-success' : 'opacity-50'}`} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-primary"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2 mt-2">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    All messages are HIPAA-compliant and encrypted. For urgent matters, call your provider directly.
                  </p>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}