import { useQuery } from "@tanstack/react-query";
import { listUpcomingLessons } from "@/data/lessons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

const UpcomingLessons = () => {
  const { data } = useQuery({ queryKey: ["upcoming-lessons"], queryFn: listUpcomingLessons });

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Lessons</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data?.map(lesson => (
            <a key={lesson.id} href={`/lesson/${lesson.id}`} className="block p-3 border rounded-md hover:bg-accent">
              <div className="font-medium">{lesson.title}</div>
              <div className="text-sm text-muted-foreground">Starts {formatDistanceToNow(new Date(lesson.startTime), { addSuffix: true })}</div>
            </a>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default UpcomingLessons;


