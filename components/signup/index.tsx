"use client";

import styles from "./index.module.css";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type signUpData } from "@/utils/schema"
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    }
  }
}

export function SignUp() {
  const router = useRouter()

  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<signUpData>({
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit = async (data: signUpData) => {
    fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to sign up")
        }
        return response
      })
      .then(() => {
        router.push("/login")
      })
      .catch((error) => {
        setError("Failed to sign up")
        console.log("Signup error: ", error)
      })
  }

  return (
    <section className={styles.page}>
      <motion.div variants={formVariants} initial="hidden" animate="visible">
        <Card className={styles.card}>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription className={styles.card_description}>Create an account for the Luxe Clinic EHR System</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <motion.div variants={itemVariants}>
                <Input
                  placeholder="Name"
                  {...register("name", { required: true })}
                />
                {errors.name && <p className={styles.form_errors}>{errors.name.message}</p>}
              </motion.div>
              <motion.div variants={itemVariants}>
                <Input
                  placeholder="Username"
                  {...register("username", { required: true })}
                />
                {errors.username && <p className={styles.form_errors}>{errors.username.message}</p>}
              </motion.div>
              <motion.div variants={itemVariants}>
                <Select onOpenChange={(value) => setValue("role", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="nurse">Nurse</SelectItem>
                    <SelectItem value="receptionist">Receptionist</SelectItem>
                    <SelectItem value="lab">Lab Scientist</SelectItem>
                    <SelectItem value="pharmacist">Pharmacist</SelectItem>
                    <SelectItem value="radiologist">Radiologist</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Input type="password" placeholder="Password" {...register("password", { required: true })} />
                {errors.password && <p className={styles.form_errors}>{errors.password.message}</p>}
              </motion.div>
              <motion.div variants={itemVariants}>
                <Input type="password" placeholder="Confirm Password" {...register("confirmPassword", { required: true })} />
                {errors.confirmPassword && <p className={styles.form_errors}>{errors.confirmPassword.message}</p>}
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button type="submit">Sign Up</Button>
              </motion.div>
            </form>
          </CardContent>
          <CardFooter>
            {error && <p className={styles.form_errors}>{error}</p>}
          </CardFooter>
        </Card>
      </motion.div>
    </section>
  )
}
