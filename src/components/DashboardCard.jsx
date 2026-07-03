import { Card, CardContent, Stack, Typography } from '@mui/material';

// Props let the same card component display different dashboard metrics.
function DashboardCard({ title, value, icon, color = 'primary.main' }) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              bgcolor: color,
              borderRadius: 2,
              color: 'white',
              height: 52,
              width: 52,
            }}
          >
            {icon}
          </Stack>
          <Stack spacing={0.5}>
            <Typography color="text.secondary" variant="body2">
              {title}
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default DashboardCard;
