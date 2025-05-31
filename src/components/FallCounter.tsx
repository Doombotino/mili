
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FallCounter = () => {
  const [fallCount, setFallCount] = useState(0);
  const { toast } = useToast();

  // Lade den Zähler beim Start
  useEffect(() => {
    const savedCount = localStorage.getItem('fallCounter');
    if (savedCount) {
      setFallCount(parseInt(savedCount, 10));
    }
  }, []);

  // Speichere den Zähler bei jeder Änderung
  useEffect(() => {
    localStorage.setItem('fallCounter', fallCount.toString());
  }, [fallCount]);

  const handleFall = () => {
    setFallCount(prev => prev + 1);
    toast({
      title: "Autsch! 😵",
      description: `Das war Sturz Nummer ${fallCount + 1}`,
      duration: 2000,
    });
  };

  const resetCounter = () => {
    setFallCount(0);
    toast({
      title: "Zähler zurückgesetzt! 🔄",
      description: "Hoffentlich fällst du nicht mehr so oft hin!",
      duration: 2000,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
            Sturz-Zähler
          </CardTitle>
          <p className="text-gray-600">
            Wie oft bist du schon hingefallen?
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Zähler Display */}
          <div className="text-center">
            <div className="text-6xl font-bold text-orange-600 mb-2">
              {fallCount}
            </div>
            <p className="text-lg text-gray-600">
              {fallCount === 0 ? "Noch keine Stürze" : 
               fallCount === 1 ? "Sturz" : "Stürze"}
            </p>
          </div>

          {/* Hauptbutton */}
          <Button
            onClick={handleFall}
            size="lg"
            className="w-full h-20 text-xl font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            🤕 Ich bin runtergefallen!
          </Button>

          {/* Reset Button */}
          {fallCount > 0 && (
            <Button
              onClick={resetCounter}
              variant="outline"
              size="sm"
              className="w-full mt-4 text-gray-600 hover:bg-gray-50"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Zähler zurücksetzen
            </Button>
          )}

          {/* Motivationsnachricht */}
          <div className="text-center text-sm text-gray-500">
            {fallCount === 0 && "Perfekt! Noch kein einziger Sturz! 🌟"}
            {fallCount >= 1 && fallCount <= 3 && "Das passiert den Besten! 💪"}
            {fallCount >= 4 && fallCount <= 10 && "Vielleicht etwas vorsichtiger sein? 🤔"}
            {fallCount > 10 && "Zeit für ein Gleichgewichtstraining! 😅"}
          </div>
        </CardContent>
      </Card>

      {/* Info Text */}
      <p className="text-center text-sm text-gray-500 mt-4">
        Deine Daten werden lokal gespeichert und bleiben privat
      </p>
    </div>
  );
};

export default FallCounter;
