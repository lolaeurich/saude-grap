import React from 'react';
import { Heart, Bell, Filter, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function PageHeader({ 
  title, 
  showLogo = false, 
  showFilters = false, 
  showNotification = false,
  showBack = false,
  backPage = "DemandasDisponiveis",
  onFilterClick 
}) {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-violet-600 to-purple-600 px-3 md:px-6 py-3 md:py-4 shadow-lg safe-top">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {showBack && (
            <Link to={createPageUrl(backPage)}>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20 h-9 w-9">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </Link>
          )}
          {showLogo && (
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
          )}
          <h1 className="text-base font-bold text-white truncate">{title}</h1>
        </div>
        
        <div className="flex items-center gap-1 flex-shrink-0">
          {showFilters && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full text-white hover:bg-white/20 h-9 w-9"
              onClick={onFilterClick}
            >
              <Filter className="w-4 h-4" />
            </Button>
          )}
          {showNotification && (
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20 relative h-9 w-9">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-400 rounded-full border border-white" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}