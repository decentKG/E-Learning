import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Subject } from '@/data/mockData';

interface SubjectCardProps {
	subject: Subject;
	lessonCount?: number;
}

const SubjectCard = ({ subject, lessonCount = 0 }: SubjectCardProps) => {
	return (
		<Link to={`/subject/${subject.id}`}>
			<Card className="shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer border-border group overflow-hidden">
				<CardHeader className="p-0">
					<div className="aspect-video bg-muted relative overflow-hidden">
						{subject.image ? (
							<img src={subject.image} alt={subject.name} className="absolute inset-0 w-full h-full object-cover" />
						) : null}
						<div className={`w-full h-full ${subject.color} ${subject.image ? 'opacity-30' : 'opacity-10'} absolute inset-0`} />
						<div className="absolute inset-0 flex items-center justify-center">
							<BookOpen className={`w-16 h-16 ${subject.color.replace('bg-', 'text-')} ${subject.image ? 'opacity-90 drop-shadow' : 'opacity-80'}`} />
						</div>
					</div>
				</CardHeader>
				<CardContent className="p-5">
					<div className="flex items-start justify-between mb-2">
						<span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
							{subject.code}
						</span>
					</div>
					<CardTitle className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
						{subject.name}
					</CardTitle>
					<CardDescription className="text-sm mb-4 line-clamp-2">
						{subject.description}
					</CardDescription>
					<div className="text-xs text-muted-foreground pt-3 border-t">
						{lessonCount} {lessonCount === 1 ? 'lesson' : 'lessons'}
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};

export default SubjectCard;
