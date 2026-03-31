import { useState } from 'react';
import { AsciiBox } from './components/AsciiBox';
import { AsciiButton } from './components/AsciiButton';
import { AsciiInput } from './components/AsciiInput';



export default function App() {

  const BASE_URL = "https://backendy2mp3-production.up.railway.app";

  const FORMATS = [
    { id: "mp3", label: "MP3", type: "audio" },
    { id: "m4a", label: "M4A", type: "audio" },
    { id: "wav", label: "WAV", type: "audio" },
    { id: "mp4", label: "MP4 (Best)", type: "video" },
    { id: "mp4_720", label: "MP4 720p", type: "video" },
    { id: "mp4_480", label: "MP4 480p", type: "video" },
    { id: "webm", label: "WebM", type: "video" },
  ];

  const [url, setUrl] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("mp3");
  const [isFetching, setIsFetching] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");

  const audioFormats = FORMATS.filter((f) => f.type === "audio");
  const videoFormats = FORMATS.filter((f) => f.type === "video");
  const selectedFmt = FORMATS.find((f) => f.id === selectedFormat);

  const fetchInfo = async () => {
    if (!url) return;
    setIsFetching(true);
    setVideo(null);
    setError("");
    try {
      const res = await fetch(`${BASE_URL}/info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setVideo(data);
    } catch {
      setError("Could not fetch video. Check the URL and try again.");
    } finally {
      setIsFetching(false);
    }
  };


  const handleDownload = async () => {
    setIsDownloading(true);
    setError("");
    try {
      const res = await fetch(`${BASE_URL}/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, format: selectedFormat }),
      });
      if (!res.ok) throw new Error("Failed");

      const ext = selectedFmt?.label.split(" ")[0].toLowerCase();
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${video?.title || "media"}.${ext}`;
      link.click();
      window.URL.revokeObjectURL(link.href);
    } catch {
      setError("Download failed. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const asciiLogo = `
██████╗ ██╗  ██╗    ██████╗  ██████╗ ██╗    ██╗███╗   ██╗██╗      ██████╗  █████╗ ██████╗ ███████╗██████╗ 
██╔══██╗██║ ██╔╝    ██╔══██╗██╔═══██╗██║    ██║████╗  ██║██║     ██╔═══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗
██║  ██║█████╔╝     ██║  ██║██║   ██║██║ █╗ ██║██╔██╗ ██║██║     ██║   ██║███████║██║  ██║█████╗  ██████╔╝
██║  ██║██╔═██╗     ██║  ██║██║   ██║██║███╗██║██║╚██╗██║██║     ██║   ██║██╔══██║██║  ██║██╔══╝  ██╔══██╗
██████╔╝██║  ██╗    ██████╔╝╚██████╔╝╚███╔███╔╝██║ ╚████║███████╗╚██████╔╝██║  ██║██████╔╝███████╗██║  ██║
╚═════╝ ╚═╝  ╚═╝    ╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝
`;

  return (
    <div className="min-h-screen bg-black text-green-400 p-4 sm:p-8 font-mono overflow-auto">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <pre className="text-cyan-400 text-[4px] sm:text-[8px] md:text-[12px] leading-tight overflow-x-auto">
            {asciiLogo}
          </pre>
          <div className="mt-4 md:hidden text-yellow-400 text-xs animate-pulse">
            {"*".repeat(30)}
          </div>
          <div className="hidden md:block mt-4 text-yellow-400 text-xs animate-pulse">
            {"*".repeat(80)}
          </div>
        </div>

        {/* URL Input */}
        <div className="mb-6">
          <AsciiBox title="PASTE VIDEO URL">
            <AsciiInput
              value={url}
              onChange={(val) => { setUrl(val); setVideo(null); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && fetchInfo()}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </AsciiBox>
        </div>

        {/* Search Button */}
        <div className="flex justify-center mb-6">
          <AsciiButton onClick={fetchInfo} disabled={isFetching || !url} variant="cyan">
            {isFetching ? "⟳ FETCHING INFO..." : "⌕ SEARCH VIDEO"}
          </AsciiButton>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6">
            <AsciiBox title="ERROR">
              <p className="text-red-400">{error}</p>
            </AsciiBox>
          </div>
        )}

        {/* Video Info */}
        {video && (
          <div className="mb-6">
            <AsciiBox title="VIDEO INFO">
              <div className="space-y-1">
                <div className="flex gap-2">
                  <span className="text-gray-500 shrink-0">TITLE:</span>
                  <span className="text-yellow-400 truncate">{video.title}</span>
                </div>
                {video.channel && (
                  <div className="flex gap-2">
                    <span className="text-gray-500 shrink-0">CHANNEL:</span>
                    <span className="text-cyan-400">{video.channel}</span>
                  </div>
                )}
                {video.duration && (
                  <div className="flex gap-2">
                    <span className="text-gray-500 shrink-0">DURATION:</span>
                    <span className="text-green-400">{video.duration}</span>
                  </div>
                )}
              </div>
            </AsciiBox>
          </div>
        )}

        {/* Format Selector — shown only after video info loaded */}
        {video && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Audio */}
              <AsciiBox title="AUDIO FORMAT">
                <div className="space-y-2">
                  {audioFormats.map((f) => (
                    <label key={f.id} className="flex items-center cursor-pointer hover:text-cyan-400 transition-colors">
                      <span className="mr-3">{selectedFormat === f.id ? "[●]" : "[ ]"}</span>
                      <input
                        type="radio"
                        name="format"
                        value={f.id}
                        checked={selectedFormat === f.id}
                        onChange={() => setSelectedFormat(f.id)}
                        className="sr-only"
                      />
                      <span className="uppercase">{f.label}</span>
                      <span className="ml-2 text-yellow-400 text-xs">♪ AUDIO</span>
                    </label>
                  ))}
                </div>
              </AsciiBox>

              {/* Video */}
              <AsciiBox title="VIDEO FORMAT">
                <div className="space-y-2">
                  {videoFormats.map((f) => (
                    <label key={f.id} className="flex items-center cursor-pointer hover:text-cyan-400 transition-colors">
                      <span className="mr-3">{selectedFormat === f.id ? "[●]" : "[ ]"}</span>
                      <input
                        type="radio"
                        name="format"
                        value={f.id}
                        checked={selectedFormat === f.id}
                        onChange={() => setSelectedFormat(f.id)}
                        className="sr-only"
                      />
                      <span className="uppercase">{f.label}</span>
                      <span className="ml-2 text-cyan-400 text-xs">▶ VIDEO</span>
                    </label>
                  ))}
                </div>
              </AsciiBox>
            </div>

            {/* Download Button */}
            <div className="flex justify-center mb-8">
              <AsciiButton onClick={handleDownload} disabled={isDownloading}>
                {isDownloading
                  ? selectedFmt?.type === "video"
                    ? "⟳ PROCESSING VIDEO... (may take a while)"
                    : "⟳ DOWNLOADING..."
                  : `⬇ DOWNLOAD ${selectedFmt?.label}`}
              </AsciiButton>
            </div>
          </>
        )}

        {/* System Info */}
        <AsciiBox title="SYSTEM INFO">
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">STATUS:</span>
              <span className={isFetching || isDownloading ? "text-yellow-400 animate-pulse" : "text-green-400"}>
                {isFetching ? "● FETCHING" : isDownloading ? "● DOWNLOADING" : "○ IDLE"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">SELECTED FORMAT:</span>
              <span className="text-cyan-400">{selectedFmt?.label.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">VIDEO LOADED:</span>
              <span className={video ? "text-green-400" : "text-gray-600"}>{video ? "YES" : "NO"}</span>
            </div>
          </div>
        </AsciiBox>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-700 text-xs">
          <div className="mb-2">{"─".repeat(30)}</div>
          <p>© 2026 DK DOWNLOADER | FOR EDUCATIONAL PURPOSES ONLY</p>
          <div className="mt-2">{"─".repeat(30)}</div>
        </div>

      </div>
    </div>
  );
}