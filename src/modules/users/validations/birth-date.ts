import { Temporal } from "@js-temporal/polyfill";
import { z } from "zod/v4";

type BirthDatePropsType = {
  min_age_user: number;
  birth_date: string;
};

const ageValidation = ({ min_age_user, birth_date }: BirthDatePropsType) => {
  try {
    const comparisonDate = Temporal.PlainDate.from(birth_date);
    const currentDate = Temporal.Now.plainDateISO();

    const age = currentDate.since(comparisonDate, {
      largestUnit: "year",
    }).years;

    return age >= min_age_user;
  } catch {
    return false;
  }
};

export const birthDateValidation = ({
  min_age_user,
  birth_date,
}: BirthDatePropsType) => {
  const birthDateSchema = z.iso.datetime({
    offset: true,
    error: "birth_date must be ISO 8601 format",
  });

  const result = birthDateSchema.safeParse(birth_date);

  if (!result.success) {
    return { valid: false, error: result.error.issues[0].message };
  }

  const isValidAge = ageValidation({ min_age_user, birth_date });

  if (!isValidAge) {
    return {
      valid: false,
      error: `user must be at least ${min_age_user} years old`,
    };
  }

  return { valid: true };
};
