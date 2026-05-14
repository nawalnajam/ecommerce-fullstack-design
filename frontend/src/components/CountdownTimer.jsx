import { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (86400000)) / (3600000)),
        minutes: Math.floor((difference % (3600000)) / (60000)),
        seconds: Math.floor((difference % (60000)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 text-center">
      <div className="bg-white rounded-lg px-3 py-2 shadow">
        <span className="text-2xl font-bold">{String(timeLeft.days).padStart(2, '0')}</span>
        <p className="text-xs">Days</p>
      </div>
      <div className="bg-white rounded-lg px-3 py-2 shadow">
        <span className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
        <p className="text-xs">Hours</p>
      </div>
      <div className="bg-white rounded-lg px-3 py-2 shadow">
        <span className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <p className="text-xs">Mins</p>
      </div>
      <div className="bg-white rounded-lg px-3 py-2 shadow">
        <span className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <p className="text-xs">Secs</p>
      </div>
    </div>
  );
}