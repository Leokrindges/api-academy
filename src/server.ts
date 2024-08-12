import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import {
  AddressesRoutes,
  AssessmentsRoutes,
  AuthRoutes,
  StudentsRoutes,
} from './routes';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (_, res) => {
  res.status(200).json({
    message: 'Hello Growdever!',
    ok: true,
  });
});

app.use('/students', StudentsRoutes.execute());
app.use('/auth', AuthRoutes.execute());
app.use('/assessments', AssessmentsRoutes.execute());
app.use('/addresses', AddressesRoutes.execute());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} 🚀`);
});
