import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { listUpcomingLessons, mockLessons, type LessonEvent } from "@/data/lessons";

const scheduleSchema = z.object({
  title: z.string().min(3),
  subject: z.string().min(2),
  teacherName: z.string().min(2),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
  roomId: z.string().min(2),
  description: z.string().optional(),
});

type ScheduleForm = z.infer<typeof scheduleSchema>;

const Schedule = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ScheduleForm>({
    resolver: zodResolver(scheduleSchema),
  });

  const onSubmit = (data: ScheduleForm) => {
    const newEvent: LessonEvent = { id: String(Date.now()), ...data } as LessonEvent;
    mockLessons.push(newEvent);
    reset();
    alert("Lesson scheduled!");
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Schedule a Live Lesson</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <Input {...register("title")} placeholder="e.g. Algebra: Quadratics" />
              {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Subject</label>
              <Input {...register("subject")} placeholder="e.g. Mathematics" />
              {errors.subject && <p className="text-red-600 text-sm">{errors.subject.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Teacher</label>
              <Input {...register("teacherName")} placeholder="e.g. Ms. Johnson" />
              {errors.teacherName && <p className="text-red-600 text-sm">{errors.teacherName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Room ID</label>
              <Input {...register("roomId")} placeholder="e.g. math-101" />
              {errors.roomId && <p className="text-red-600 text-sm">{errors.roomId.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Start Time (ISO)</label>
              <Input {...register("startTime")} placeholder={new Date().toISOString()} />
              {errors.startTime && <p className="text-red-600 text-sm">{errors.startTime.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">End Time (ISO)</label>
              <Input {...register("endTime")} placeholder={new Date(Date.now()+3600000).toISOString()} />
              {errors.endTime && <p className="text-red-600 text-sm">{errors.endTime.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Description</label>
              <Textarea {...register("description")} placeholder="What will you cover?" />
            </div>
            <div className="md:col-span-2">
              <Button type="submit">Create Lesson</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Lessons</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Simple list using mock data */}
          {mockLessons.map(lesson => (
            <div key={lesson.id} className="flex items-center justify-between p-3 border rounded-md">
              <div>
                <p className="font-medium">{lesson.title} — {lesson.subject}</p>
                <p className="text-sm text-muted-foreground">{lesson.teacherName} • {format(new Date(lesson.startTime), "PPpp")} → {format(new Date(lesson.endTime), "pp")}</p>
              </div>
              <a className="text-primary hover:underline" href={`/lessons/live/${lesson.roomId}`}>Enter Room</a>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Schedule;


