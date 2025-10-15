import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Video, Paperclip } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Lesson } from '@/data/mockData';
import { format } from 'date-fns';

interface LessonCardProps {
  lesson: Lesson;
  subjectName?: string;
}

const LessonCard = ({ lesson, subjectName }: LessonCardProps) => {
  return (
    <Link to={`/lesson/${lesson.id}`}>
      <Card className="shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer border-border group">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-3">
            {subjectName && (
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                {subjectName}
              </span>
            )}
            <div className="flex gap-2">
              {lesson.videoUrl && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  <Video className="w-3 h-3" />
                  Video
                </Badge>
              )}
              {lesson.attachments && lesson.attachments.length > 0 && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  <Paperclip className="w-3 h-3" />
                  {lesson.attachments.length}
                </Badge>
              )}
            </div>
          </div>
          <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2">
            {lesson.title}
          </CardTitle>
          <CardDescription className="text-sm line-clamp-2">
            {lesson.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-xs text-muted-foreground">
            {format(new Date(lesson.createdAt), 'MMM dd, yyyy')}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LessonCard;
