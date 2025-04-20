import { Progress } from "@radix-ui/react-progress";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  progress?: number;
  icon?: React.ReactNode;
}

export function StatsCard({
  title,
  value,
  description,
  progress,
  icon,
}: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {progress !== undefined && (
          <Progress value={progress} className="h-2 mt-3" />
        )}
      </CardContent>
    </Card>
  );
}

export default StatsCard;
