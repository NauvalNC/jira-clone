"use client";

import React from 'react';
import {Card, CardHeader, CardTitle, CardContent, CardDescription} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import DottedSeparator from "@/components/dotted-separator";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import Link from "next/link";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {registerSchema} from "@/features/auth/schemas";
import {useRegister} from "@/features/auth/api/use-register";

const SignUpCard = () => {
    const {mutate, isPending} = useRegister();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues:
        {
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof registerSchema>) =>
    {
        mutate({json: values});
    };

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">
                    Sign Up
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter your name"
                                            {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}>
                        </FormField>
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter email address"
                                            {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}>
                        </FormField>
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter password"
                                            {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}>
                        </FormField>
                        <Button
                            disabled={isPending}
                            size="lg"
                            className="w-full">
                            Register
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    disabled={isPending}>
                    <FcGoogle className="mr-2 size-5"/>Login with Google
                </Button>
                <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    disabled={isPending}>
                    <FaGithub className="mr-2 size-5"/>Login with GitHub
                </Button>
            </CardContent>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7 flex items-center justify-center">
                <p>
                    Already have an account?{" "}
                    <Link href="/sign-in">
                        <span className="text-blue-700">Login</span>
                    </Link>
                </p>
            </CardContent>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardDescription>
                    By signing up, you are agree to our <br/>
                    <Link href="#">
                        <span className="text-blue-700">Privacy Policy</span>
                    </Link>
                    {" "} and {" "}
                    <Link href="#">
                        <span className="text-blue-700">Terms of Services</span>
                    </Link>
                </CardDescription>
            </CardHeader>
        </Card>
    );
};

export default SignUpCard;